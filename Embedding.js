const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors:[authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}
async function updatecourse(id)
{
    const course=await Course.update({_id:id},{
        $unset:{
            'author.name':' '
        }}
    );
   
 
}
async function addauthor(id,author)
{
    const course=await Course.findById(id);
    course.authors.push(author);
    course.save();
}
async function removeauthor(id,authorid)
{
    const course=await Course.findById(id);
    const author=course.authors.id(authorid);
    author.remove();
    course.save();

}

//updatecourse('5f02cd781d137c65ec39f0a6')
/*createCourse('Node Course', [
    new Author({ name: 'Mosh' }),
    new Author({ name: 'Swathi' })
]
);*/
removeauthor('5f02d0eaa420c34588b27479','5f02d2242a6dc80804737c5d')
