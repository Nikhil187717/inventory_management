require('dotenv').config()

exports.init = async (content) => {
    console.log(content.username, content.password)
    return content
}