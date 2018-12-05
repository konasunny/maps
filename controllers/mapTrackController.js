var mapTrackModel = require('../models/mapTrackModel.js');
/**
 * mapTrackController.js
 *
 * @description :: Server-side logic for managing cars.
 */
module.exports = {

  /**
   * mapTrackController.list()
   */
  getAll: function (req, res) {
    mapTrackModel.find(function (err, points) {
      if (err) {
        return res.status(500).json({
          message: 'Error getting map points.'
        });
      }
      return res.json(points);
    });
  },

  /**
   * mapTrackController.show()
   */
  getByTechId: function (req, res) {
    var requestId = req.params.requestId;
    var techId = req.params.techId;
    mapTrackModel.findOne({
        transaction_reference: requestId,
        technician_id: techId
      }).sort({'_id': -1}).exec(
        function (err, point) {
        if (err) {
          return res.status(500).json({
            message: 'Error getting map point.'
          });
        }
        if (!point) {
          return res.status(404).json({
            message: 'No such track points exists'
          });
        }
        return res.json(point);
      });
  },

  /**
   * mapTrackController.create()
   */


  create: function (req, res) {
    var point = new mapTrackModel({
      transaction_reference: req.body.transaction_reference,
      technician_id: req.body.technician_id,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      is_destination_reached: req.body.is_destination_reached,
      duration: req.body.duration,
      created_by: req.body.created_by,
      created_user: req.body.created_user,
      timestamp: req.body.timestamp
    });

    point.save(function (err, point) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving car',
          error: err
        });
      }
      return res.json({
        message: 'saved',
        _id: point._id
      });
    });
  },

  /**
   * mapTrackController.update()
   */
  update: function (req, res) {
    var id = req.params.id;
    mapTrackModel.findOne({
      _id: id
    }, function (err, point) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving map point',
          error: err
        });
      }
      if (!point) {
        return res.status(404).json({
          message: 'No such car'
        });
      }

      point.latitude = req.body.latitude ? req.body.latitude : point.latitude;
      point.longitude = req.body.longitude ? req.body.longitude : point.longitude;
      point.timestamp = new Date();
      point.save(function (err, point) {
        if (err) {
          return res.status(500).json({
            message: 'Error getting map point.'
          });
        }
        if (!car) {
          return res.status(404).json({
            message: 'No such map Point'
          });
        }
        return res.json(point);
      });
    });
  },

  /**
   * mapTrackController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;
    mapTrackModel.findByIdAndRemove(id, function (err, point) {
      if (err) {
        return res.status(500).json({
          message: 'Error getting map point.'
        });
      }
      return res.json(point);
    });
  }
};