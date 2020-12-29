const faker = require('faker');
const Post = require('./models/post');
const cities = require('./cities');

async function seedPosts() {
	await Post.remove({});
	for(const i of new Array(600)) {
		const random1000 = Math.floor(Math.random() * 1000);
		const title = faker.lorem.word();
		const description = faker.lorem.text();
		const postData = {
			title,
			description,
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			geometry: {
				type: 'Point',
				coordinates: [cities[random1000].longitude, cities[random1000].latitude],
			},
			author: {
		    '_id' : '5fd0d586b82bb61ec0af57fb',
		    'username' : 'alex1'
		  }
		}
		let post = new Post(postData);
		post.properties.description = `<strong><a href="/posts/${post._id}">${title}</a></strong><p>${post.location}</p><p>${description.substring(0, 20)}...</p>`;
		await post.save();
	}
	console.log('600 new posts created');
}

module.exports = seedPosts;
/* 
{"_id":{"$oid":"5fd0d586b82bb61ec0af57fb"},"posts":[],"username":"alex1","email":"email@email.com","image":"http://image.com/image.png","salt":"7ed1e5010d6306ea92a6d4f7ff671801e1794fbdf19cc09c2bb9b79e5ac4862e","hash":"01151736df15f85e2ce4c728b1151d7b713a7b0610e7072a28d1692dadb716d0eae1b65405b066d65701ac665a11671bce6e064d319dfa9a3b5bf06944026eb025432715a04eb333c82f6b0f2ee26c7a1bdd4217d260f267383df37b547c5a997fcc1fe2761c48658588bed4c4b3e92d04d5142c57d2d99cd625cfe4d4d2283d6b9b74eed7dcd67f4ec2c6fe1be51864ce28c5f2f2c15bb08d0fe168fb459ae50c7a4dddf1a1a0328404848300ea59e1330cfa5d0b9849b2123848175dd3fe464886acb70a5f704b1fe0ae2ff47f24bb7ddacce7fe40bcea65fbad4c3fb0b013c4b34d52d23868c78be068c17628eebd7a75964757700eb454b9b826c3c660fe64f4df5143333243a9822c66006e25c019b625bc0e47661e55dea55b9c74c7fac7703794cbb62d836030cae5b226b0f8a2c32fe723e0b55f5b332db03565944c218c656b3cf3321acbbe4ede14787eadd807a141598fee9c7c827d9e887783c6370e1bf0f388320ed7db2c5d304f620db43ff796a98b8bda190338d6b8e1697247e2693ade9d8f13584719b6d7508a466cd5546fc88100f1bb1f22a2695f0b598c2ae0e8f36055de8046371136b94c12b3d0879cc48504593edb281c22c9c3effe09c42b127aeb4ff89cd2ec0acb7d9667da5f9f5b19f9de8d37166a297636544e5f3da6abf84e33d22ddd5dea65ba0a8cde92e3ac68164313410f5e2b58777c","__v":{"$numberInt":"0"}}*/