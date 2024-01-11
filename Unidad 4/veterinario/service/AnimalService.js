import{Animal} from"../model/Animal.js";

export function getAnimals(){
    const animal1 = new Animal(1,"Firulais","M",null,"DOG");
    const animal2 = new Animal(2,"Copito","M",345,"DOG");
    const animal3 = new Animal(3,"Blacky","M",567,"DOG");
    const animal4 = new Animal(4,"Luna","M",967,"DOG");
    const animal5 = new Animal(5,"Holly","M",482,"DOG");
    const animal6 = new Animal(6,"Kika","M",null,"DOG");
    const animal7 = new Animal(7,"Black","M",583,"DOG");
    return[animal1,animal2,animal3,animal4,animal5,animal6,animal7];
}
export function getAnimal(idAnimal){
    const animals = getAnimals();
    // for (let i = 0; i < animals.length; i++) {
    //     if (animals[id]===idAnimal) {
    //         return animals[i];
    //     }
        
    // }
    // animals.forEach(animal=>{
    //     if (animal.id===idAnimal) {
    //         return animal;
    //     }
    // });
    return animals.find(function(ani){
        return ani.id === idAnimal;
    })
}
// function getDogs(){
//     const animals = getAnimals();
//    var idDog = function(animal){

//    }
// }