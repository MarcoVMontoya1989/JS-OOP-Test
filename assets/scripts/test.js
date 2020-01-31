// class PersonPrice {
//     constructor(name = 'foobar', lastName = 'barfoo', price = 0) {
//         this.name = name;
//         this.lastName = lastName;
//         this.price = price;
//     }
// }
//
// const acum = [];
//
// testAddPerson = (name, lastname, price) => {
//     let persona = new PersonPrice(name, lastname, price);
//     acum.push(persona);
// };
//
// let persona = new PersonPrice('asuka', 'langley', 12300);
//
//

const allHeaderHTML = document.createElement('div');

class TestOriginBlueprint {
    constructor(name = 'default', price = 1) {
        this.name = name;
        this.price = price;
    }
}

//*********************************************************************


// THIS CLASS ONLY RENDER THE HTML TAG RECEIVED FROM THE OBJECT ORIGIN
class newObjectToRender {
    constructor(obj) {
        this.obj = obj;
    };

    render() {
        const elem = document.createElement('a');
        elem.innerHTML = `${this.obj.name} ${this.obj.price}`;

        return elem;
    };
}

//---------------------------------------------------------------------

class secondClassUsingFirstClass {
    objs = [
      new TestOriginBlueprint('def', 123),
      new TestOriginBlueprint('foo', 321),
    ];

    constructor() {};

    render() {
        const newList = document.createElement('div');
        newList.className = 'inside div';

        for (const obj of this.objs) {
            const newObj = new newObjectToRender(obj);

            newList.append(newObj.render());
        }

        return newList;
    }
}


class thirdClass {
    info = [];

    addSubTest(origData) {
        this.info.push(origData);
        this.render();
    }

    render() {
        const thirdElem = document.createElement('section');
        thirdElem.innerHTML = `<h1>${this.info.name}</h1>`;
        console.log('works in thirdClass');

        return thirdElem;
    }
}

class GeneralAccess {
    render() {
        this.third = new thirdClass();
        const thirdElem = this.third.render();

        const listRendering = new secondClassUsingFirstClass();
        const objElem = listRendering.render();

        allHeaderHTML.append(thirdElem);
        allHeaderHTML.append(objElem);
        // const second = new secondClass();
    }
}