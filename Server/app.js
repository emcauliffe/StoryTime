const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Sheran:Sheran42069@dh6storytime-hcuaz.mongodb.net/StoryTime?retryWrites=true&w=majority', {useNewUrlParser: true});

const bookSchema = new mongoose.Schema({
    Title: String,
    Author: String,
    Genre: String,
    Words: Number,
    Content: String
});

const Book = mongoose.model("Book", bookSchema);



function returnStory(num){
    if(num == 1)
    {
        Book.find({Title: "Escape"}, function(err, book)
        {
            if(err)
            {
                console.log("Error");
            }
            else
            {
                console.log(book);
            }
        }
        );
    }
    else if(num == 2)
    {
        Book.find({Title: "Gerontion"}, function(err, book)
        {
            if(err)
            {
                console.log("Error");
            }
            else
            {
                console.log(book);
            }
        }
        );
    }
    else if(num == 3)
    {
        Book.find({Title: "Wild Peaches"}, function(err, book)
        {
            if(err)
            {
                console.log("Error");
            }
            else
            {
                console.log(book);
            }
        }
        );
    }
    else if(num == 4)
    {
        Book.find({Title: "Faces"}, function(err, book)
        {
            if(err)
            {
                console.log("Error");
            }
            else
            {
                console.log(book);
            }
        }
        );
    }
    else if(num == 5)
    {
        Book.find({Title: "The Love Son of J. Alfred Prufrock"}, function(err, book)
        {
            if(err)
            {
                console.log("Error");
            }
            else
            {
                console.log(book);
            }
        }
        );
    }
    else if(num == 6)
    {
        Book.find({Title: "The Haunted Mind"}, function(err, book)
        {
            if(err)
            {
                console.log("Error");
            }
            else
            {
                console.log(book);
            }
        }
        );
    }
    else if(num == 7)
    {
        Book.find({Title: "Eveline"}, function(err, book)
        {
            if(err)
            {
                console.log("Error");
            }
            else
            {
                console.log(book);
            }
        }
        );
    }
    else if(num == 8)
    {
        Book.find({Title: "Saint George and the Dragon"}, function(err, book)
        {
            if(err)
            {
                console.log("Error");
            }
            else
            {
                console.log(book);
            }
        }
        );
    }
    else if(num == 9)
    {
        Book.find({Title: "The Fly"}, function(err, book)
        {
            if(err)
            {
                console.log("Error");
            }
            else
            {
                console.log(book);
            }
        }
        );
    }
    }

returnStory(minute);