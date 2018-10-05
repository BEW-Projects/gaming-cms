import Configuration from '../models/configuration'

// Get currentTheme from database or return default
exports.getTheme = () => {
    var result = 'default'
    exports.getOne('currentTheme').then(config => {
        if(config) {
            result = config.value
        } else {
            // If configuration doesn't exist, create it
            exports.createOne({
                name: 'currentTheme',
                value: 'default'
            })
        }
    }).catch(err => { console.log(err) })
    return result
}

// creates configuration and returns new configuration Object
exports.createOne = async (data) => {
    try {
        return await Configuration.create(data)
    } catch (err) {
        return console.error(err.message)
    }
}

// returns single configuration by name
exports.getOne = async (name) => {
    try {
        return await Configuration.findOne({ name: name })
    } catch (err) {
        return console.error(err.message)
    }
}

// Export our model to be used by the router if needed
exports.Configuration = Configuration
