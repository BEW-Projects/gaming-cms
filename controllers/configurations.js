import Configuration from '../models/configuration'

// default configurations
const defaultConfigurations = {
    'currentTheme': 'default',
    'siteName': 'My Site'
}

// initializes configuration if none exists
const initialize = async () => {
    try {
        for (var config in defaultConfigurations) {
            await exports.create(config, defaultConfigurations[config])
        }
    } catch (error) {
        return console.error(error.message)
    }
}

// creates configuration and returns new configuration Object
exports.create = async (name, value) => {
    try {
        let config = await Configuration.find({ name: name }).limit(1)
        if (config.length == 0) {
            return await Configuration.create({
                name: name,
                value: value
            })
        }
    } catch (error) {
        return console.error(error.message)
    }
}

// returns value for configuration by name
const getValue = async (name) => {
    try {
        let config = await Configuration.find({ name: name }).limit(1)
        return config[0].value
    } catch (error) {
        return console.error(error.message)
    }
}

// returns all configurations as a collection, initialize config if empty
exports.get = async () => {
    try {
        let configs = await Configuration.find()
        if (configs.length < Object.keys(defaultConfigurations).length) await initialize()
        configs = await Configuration.find()
        return configs.reduce((acc, cur) => ({...acc, [cur.name]: cur.value}), {})
    } catch (err) {
        return console.error(err.message)
    }
}
