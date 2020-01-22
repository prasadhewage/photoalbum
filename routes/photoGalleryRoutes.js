const mongoose = require('mongoose');
const PhotoGallery = mongoose.model('photoGallery');
const request = require('request');

module.exports = (app) => {

  app.get(`/api/loadPhotos`, async (req, res) => {
    let resp = null;
    request.get(
        'https://dev-pb-apps.s3-eu-west-1.amazonaws.com/collection/CHhASmTpKjaHyAsSaauThRqMMjWanYkQ.json',
        {},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return res.status(200).send(JSON.parse(body));
            } else {
                return res.status(404).send(error);
            }
        }
    );

  });

  app.get(`/api/photoGallery`, async (req, res) => {
    let PhotoGallerys = await PhotoGallery.find();
    return res.status(200).send({data: PhotoGallerys});
  });

  app.post(`/api/savePhotoGallery`, async (req, res) => {

    PhotoGallery.deleteMany({ savedInphotoGallary: 1  }, function (err) {})
    .then(resp => {
        return PhotoGallery.create(req.body)
    })
    .then((PhotoGallery) => {
        res.status(201).send({
            error: false,
            data: PhotoGallery
          })
    })
    .catch(err => {
      res.status(500).json({ error : err });
    });
  })

}