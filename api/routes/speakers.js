const express = require('express');
const router = express.Router();
const multer = require('multer');
const Speaker = require('../models/Speaker');
const authenticate = require('../middleware/authenticate');

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

router.post('/speaker', upload.single('photo'), async (req, res) => {
  const { name, profession, role,facebook,linkedin,twitter } = req.body;
  
  const file = req.file;

  let newSpeaker;
  
  if(file){
    newSpeaker = new Speaker({
      name: name,
      profession: profession,
      photo: {
        data: file.buffer, 
        contentType: file.mimetype, 
      },
      role: role,
      facebook: facebook,
      linkedin: linkedin,
      twitter: twitter,
    });
  }
  else{
    newSpeaker = new Speaker({
      name: name,
      profession: profession,
      role: role,
      facebook: facebook,
      linkedin: linkedin,
      twitter: twitter,
    });
  }

  try {
    const savedSpeaker = await newSpeaker.save();
    res.status(200).json(savedSpeaker);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json(err);
  }
});

router.get('/speaker', async (req, res) => {
  try {
    const speakers = await Speaker.find();
    const modifiedSpeakers = speakers.map(speaker => ({
      _id: speaker._id,
      name: speaker.name,
      profession: speaker.profession,
      role: speaker.profession,
      facebook: speaker.facebook,
      linkedin: speaker.linkedin,
      twitter: speaker.twitter,
      photo: speaker.photo ? `data:${speaker.photo.contentType};base64,${speaker.photo.data.toString('base64')}` : null
    }));
    res.status(200).json(modifiedSpeakers);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json(err);
  }
});

router.delete('/speaker/:id' ,async (req, res) => {
  const speakerId = req.params.id;

  try {
    const deletedSpeaker = await Speaker.findByIdAndDelete(speakerId);
    if (!deletedSpeaker) {
      return res.status(404).json({ error: 'Speaker not found' });
    }
    res.status(200).json({ message: 'Speaker deleted successfully' });
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
