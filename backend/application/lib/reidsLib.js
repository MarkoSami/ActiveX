const redis = require('redis');
const { v4: uuidv4 } = require('uuid');
const utils = require('util');

// establishing redis client 
const redisClient = redis.createClient({
    password: 'iJ7YeUAagkGXSeIDEUBPZq58TB02oSma',
    socket: {
        host: 'redis-15255.c300.eu-central-1-1.ec2.cloud.redislabs.com',
        port: 15255
    }
});

//promisifing redis client functions
redisClient.set = utils.promisify(redisClient.set);
redisClient.get = utils.promisify(redisClient.get);
redisClient.rPush = utils.promisify(redisClient.rPush);



// ctreate redis connection
const createRedisConnection = async () => {
    console.log('client created...');
    redisClient.connect();
    console.log('Redis connected...');
};


// creating the room cluster in redis 
const createRoomsCluster = async () => {
    if (!(await redisClient.get('rooms'))) {
        try {
            await redisClient.set('rooms', []);
        } catch (err) {
            console.log(err);
        }
        return;
    }
    console.log('found rooms cluster in redis');
    return;
};

// creating the randomRoom cluster in redis 
const createRandomRoomsCluster = async () => {
    if (!(await redis.get('randomRooms'))) {
        try {
            await redisClient.set('randomRooms', []);
        } catch (err) {
            console.log(err);
        }
        return;
    }
    console.log('found RandomRooms cluster in redis');
    return;
}


const getRandomRoomId = async () => {
    if (!(await redisClient.get('randomRooms'))) {
        this.createRandomRoomsCluster();
        const roomId = uuidv4();
        this.addNewRandomRoom(roomId);
        return roomId;
    }
    const roomId = await redisClient.srandmember('randomRooms');
    await redisClient.srem('randomRooms', roomId);
    return roomId;

};


// add new random room to the random rooms cluster 
const addNewRandomRoom = async (roomId) => {
    if (!(await redisClient.get('RandomRooms'))) {
        this.createRandomRoomsCluster();
        return;
    }

    if (redisClient.get('randomRooms').indexOf(roomId) !== -1) {
        console.log('Random room does exists ');
        return;
    }

    try {
        await redisClient.rpush('randomRooms', roomId);
        console.log(`new  random room has been created... with id :${roomId}`);
    } catch (err) {
        console.log(err);
    }
}


// add new room to the room cluster 
const addNewRoom = async (roomId) => {
    if (!(await redisClient.get('rooms'))) {
        this.createRoomsCluster();
        return;
    }

    if (redisClient.get('rooms').indexOf(roomId) !== -1) {
        console.log('Room does exists ');
        return;
    }

    try {
        await redisClient.rpush('rooms', roomId);
        console.log(`new  room has been created... with id :${roomId}`);
    } catch (err) {
        console.log(err);
    }
};






module.exports = {
    createRoomsCluster,
    createRedisConnection,
    addNewRoom,
    createRandomRoomsCluster,
    addNewRandomRoom
};





