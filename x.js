//Using references(Normalization)
//trade of btn the query performace vs consistency

let author={
    name:"Swathi"
}
let course={    
    author:"id",
   /* authors:[
        'id1',
        'id2'
    ]*/
}
//embed author document into course document
//denormilization
let Course={
    author:
    {
        name:"Swathi Daggubati"
    }
}//(Denormilization)==>Nosql apllications


//3 approach hybrid approach
let author=
{
name:"Mosh"
}
let course={
 author:   {
        id:'ref',
        name:'Mosh'

    }
}