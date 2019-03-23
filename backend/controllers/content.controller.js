const Content = require('../models/content.model');

exports.contentCreate = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Content can not be empty"
        });
    }

    const content = new Content(
        {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description
        }
    );

    content.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the content."
        });
    });
};

exports.contentDetails = (req, res) => {
    Content.findById(req.params.id).then(content => {
        if(!content) {
            return res.status(404).send({
                message: "Content not found with id " + req.params.id
            });            
        }
        res.send(content);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Content not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving content with id " + req.params.id
        });
    });
};

exports.contentList = (req, res) => {
    Content.find().then(contents => {
        res.send(contents);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving contents."
        });
    });
};

exports.contentUpdate = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Content content can not be empty"
        });
    }

    Content.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description
    }, {new: true})
    .then(content => {
        if(!content) {
            return res.status(404).send({
                message: "Content not found with id " + req.params.id
            });
        }

        res.send(content);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Content not found with id " + req.params.id
            });                
        }

        return res.status(500).send({
            message: "Something wrong updating content with id " + req.params.id
        });
    });
};

exports.contentDelete = (req, res) => {
    Content.findByIdAndRemove(req.params.id)
    .then(content => {
        if(!content) {
            return res.status(404).send({
                message: "Content not found with id " + req.params.id
            });
        }
        res.send({message: "Content deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Content not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete content with id " + req.params.id
        });
    });
};

exports.printStair = (req, res) => {
    const times = req.params.times;
    const line = Array(times + 1).fill(' ');
    for (let i = times - 1; i >= 0; i--) {
        line[i] = '#';
        //console.log(line.join(''));
        res.write(line.join('')+"\n");
    }

    res.end();
};

exports.printNumber = (req, res) => {
    
    const number = req.params.number;
    
    let reverseDigits = number.toString().split('').reverse();

    const line = Array(reverseDigits.length + 1).fill(' ');

    let lineSize = line.length;

    reverseDigits.forEach((digit,index) => {
        
        line[lineSize] = digit;
        lineSize = lineSize - 1;
        res.write(line.reduce((a, b) => a + b, '')+"\n");
    });

    res.end();
};

exports.nearbyEvent = (req, res) => {
    // Case : AAAA-MM-DD
    let eventDates = JSON.parse(req.params.eventDates);

    eventDates.map(date => {
        let eventDateParts = date.split('-');
        return new Date(eventDateParts[0], eventDateParts[1] - 1, eventDateParts[2]);
    });
    
    let dateParts = req.params.dateForQuery.split('-');
    const dateForQuery = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

    let closest = eventDates.reduce((a, b) => a - dateForQuery < b - dateForQuery ? a : b);
    
    res.write(closest);

    res.end();
};