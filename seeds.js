const faker = require('faker');

const Post = require('./models/post');

async function seedPosts() {
    await Post.remove({});
    for(const i of new Array(40)){
        const post = {
            title: faker.lorem.word(),
            description : faker.lorem.text(),
            coordinates: [-78.467834,-0.180653],
            author: {
                '_id':'5fd0d422c1a35a4c70ac26ff',
                'username': 'alex'
              }
        }
        await Post.create(post)
    }
    console.log('40 new posts create');
}


module.exports =  seedPosts;