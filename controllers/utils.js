import Configuration from '../models/configuration'

// Get currentTheme from database or return default
exports.getTheme = () => {
    var result = 'default'
    Configuration.findOne({ name: 'currentTheme' }).then(config => {
        if(config) result = config.value
    }).catch(err => { console.log(err) })
    return result
}

// Export our model to be used by the router if needed
exports.Configuration = Configuration