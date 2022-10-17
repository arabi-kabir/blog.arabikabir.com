import Schema from 'validate'

const post = new Schema({
    title : {
        type: String,
        required: true,

        message: {
            required: 'Please enter a valid Post title',
        }
    },
    short_description: {
        type: String,
        required: true,
    },
    content : {
        type: String,
        required: true,

        message: {
            required: 'Post content can not be empty',
        }
    }
})

export default post