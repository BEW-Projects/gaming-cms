import Configuration from '../models/configuration'

// initializes configuration if none exists
exports.initialize = async () => {
    try {
        await exports.createOne('currentTheme', 'default')
        await exports.createOne('siteName', 'My Site')
        return await exports.get()

    } catch (err) {
        return console.error(err.message)
    }
}

// creates configuration and returns new configuration Object
exports.createOne = async (name, value) => {
    try {
        let config = await Configuration.find({ name: name }).limit(1)
        if (config.length > 0) {
            return
        }
        return await Configuration.create({
            name: name,
            value: value
        })
    } catch (err) {
        return console.error(err.message)
    }
}

// returns value for configuration by name
exports.getValue = async (name) => {
    try {
        let config = await Configuration.find({ name: name }).limit(1)
        return config[0].value
    } catch (err) {
        return console.error(err.message)
    }
}

// returns all configurations as a collection
exports.get = async () => {
    try {
        let configs = await Configuration.find({})
        return configs.reduce((acc, cur) => ({...acc, [cur.name]: cur.value}), {})
    } catch (err) {
        return console.error(err.message)
    }
}

// Export our model to be used by the router if needed
exports.Configuration = Configuration
