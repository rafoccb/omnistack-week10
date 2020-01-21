const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const {findConnections, sendMessage } = require('../websocket');

// index, show, store, update, destroy (geralmente nomes de funções)
// index - mostrar uma lista
// show - mostrar um unico
// store = criar 
// update - alterar
// destroy - deletar

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs , latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });
        if(!dev){
            // await para esperar a resposta
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = apiResponse.data; 
    
            const techsArray = parseStringAsArray(techs);
    
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
    
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });

            // Filtrar as conexões que estão a no máximo a 10km de distância
            // e que o novo dev pelo menos uma das techs filtradas

    
            // console.log(name, avatar_url, bio, github_username);
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            ); 
            // console.log(sendSocketMessageTo);
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }  
        return response.json(dev); // json não pode ser string, deve ser objeto ou array 
    }
};