import Schema from 'validate'

const post = new Schema({
    title : {
        type: String,
        required: true,

        message: {
            required: 'Please enter a valid Post title',
        }
    },
    author : {
        type: String,
        required: true,

        message: {
            required: 'Please enter a valid Author name',
        }
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