//Saskia Steyn u17267162

var pets = [
  { name: "Polly", species: "bird", age: 1, adopted: false, adoptedDate: "", adoptionFee: 560 },
  { name: "Fluffy", species: "dog", age: 4, adopted: true, adoptedDate: "2023-03-27",adoptionFee: 890 },
  { name: "Daisy", species: "dog", age: 9, adopted: true, adoptedDate: "2021-01-05", adoptionFee: 780 },
  { name: "Coco", species: "rabbit", age: 3, adopted: true, adoptedDate: "2019-01-30", adoptionFee: 615 },
  { name: "Simba", species: "cat", age: 4, adopted: true, adoptedDate: "2019-09-30", adoptionFee: 995 },
  { name: "Oreo", species: "rabbit", age: 4, adopted: false, adoptedDate: "", adoptionFee: 605 },
  { name: "Bella", species: "cat", age: 6, adopted: false, adoptedDate: "", adoptionFee: 810 },
  { name: "Milo", species: "bird", age: 3, adopted: false, adoptedDate: "", adoptionFee: 740 },
  { name: "Buddy", species: "dog", age: 10, adopted: true, adoptedDate: "2021-02-01", adoptionFee: 735 },
  { name: "Pebbles", species: "bird", age: 4, adopted: false, adoptedDate: "", adoptionFee: 505 },
];

class PetHandler {
  constructor(petInfo) {  

    this.petInfo = petInfo;

  }

  findPetsInAgeRange(minAge, maxAge){

      return this.petInfo.filter((i) => i.age <= maxAge && i.age >= minAge);

  }

  listAdoptedPetsByDate(){

      return this.petInfo.filter((i) => i.adopted === true)
        .sort((a, b) => {

            var dateA = new Date(a.adoptedDate).getTime();
            var dateB = new Date(b.adoptedDate).getTime();

            return dateA - dateB;
        })
        .reverse();

  }

  listPets(...otherArgs){

    function createPetItem(petItem){

      if(petItem.adopted === true){

          return petItem.name + " | " + petItem.species + " | Age: " + petItem.age + " | Adopted!";

      } else{

        return petItem.name + " | " + petItem.species + " | Age: " + petItem.age;

      }
    }
    //stupid ass dumb shit.,........!!!
    // if(Array.isArray(...otherArgs)){
    //   console.log(...otherArgs, "IS ARRAY");
    //   let arr2 = [...otherArgs].map((element, index) => createPetItem(element[index])).toString();
    //   return arr2;
    // } else{
    //   console.log(otherArgs, "IS NOT ARRAY");
    //   return createPetItem(...otherArgs);

    // }

    if(Array.isArray(otherArgs[0])){

      return otherArgs[0].map((element) => createPetItem(element)).join("\n");

  } else{

      return createPetItem(otherArgs[0]);
  }

  }

  calculateUniqueAdoptionFee(...petNames){

    if(Array.isArray(petNames[0])){

      var removedDuplicates = [...new Set(...petNames)];
      var filterArray = this.petInfo.reduce((acc, currElement) => removedDuplicates.includes(currElement.name) ? [...acc, currElement] : acc, []);
      var sum = filterArray.reduce((acc, currElement) => acc + currElement.adoptionFee, 0);

      return sum;

  } else{

      var filterArray = this.petInfo.reduce((acc, currElement) => petNames[0] === currElement.name ? [...acc, currElement] : acc, []);

      var sum = filterArray.reduce((acc, currElement) => acc + currElement.adoptionFee, 0);

      return sum;
      
  }

  }
}

Array.prototype.listPets = function(){
  return pethandler.listPets(this);
}

Array.prototype.findPetsInAgeRange = function(minAge, maxAge){
  return pethandler.findPetsInAgeRange(minAge, maxAge);
}

Array.prototype.listAdoptedPetsByDate = function(){
  return pethandler.listAdoptedPetsByDate();
}

Array.prototype.calculateUniqueAdoptionFee = function(petNames){
  return pethandler.calculateUniqueAdoptionFee(petNames);
}

var pethandler = new PetHandler(pets);

console.log("FINDING PETS IN RANGE");
console.log(pethandler.findPetsInAgeRange(9,10));
console.log("LISTING ADOPTED PETS BY DATE");
console.log(pethandler.listAdoptedPetsByDate());
console.log("LIST PETS");
console.log(pethandler.listPets(pets));
console.log("LIST PET WITH SINGLE PARAM");
console.log(pethandler.listPets(pets[0]));
var names = ["Milo", "Coco", "Milo"];
console.log("CALCULATE UNIQUE ADOPTION FEE WITH MULTIPLE PETS");
console.log(pethandler.calculateUniqueAdoptionFee(names));

var nameSingle = "Milo";
console.log("CALCULATE UNIQUE ADOPTION FEE WITH SINGLE PET");
console.log(pethandler.calculateUniqueAdoptionFee(nameSingle));

console.log("TESTING FUNCTION CHAINING");
console.log(pethandler.findPetsInAgeRange(1,5).listPets());

console.log("TESTING FUNCTION CHAINING - FIND PETS IN AGE RANGE");
console.log(pethandler.findPetsInAgeRange(1,5).findPetsInAgeRange(4, 4).listPets());

console.log("TESTING FUNCTION CHAINING - LIST ADOPTED PETS BY DATE");
console.log(pethandler.findPetsInAgeRange(1,5).listAdoptedPetsByDate().listPets());

console.log("TESTING FUNCTION CHAINING - CALCULATE UNIQUE PETS");
console.log(pethandler.findPetsInAgeRange(1,5).calculateUniqueAdoptionFee(["Daisy", "Simba"]));

console.log("MEMO CODE");
var memoNames = ["Milo", "Oreo", "Milo", "Coco", "Pebbles"];
console.log(pethandler.calculateUniqueAdoptionFee(memoNames));

