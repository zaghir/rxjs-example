import { Observable, Subject, fromEvent, merge, from } from 'rxjs';
import { map, switchMap, filter, pluck } from 'rxjs/operators';

// Creation d 'un observable 
let observable = Observable.create((observer: any) => {
    try {
        observer.next("Start !");
        observer.next("How are you?");
        setInterval(() => {
            observer.next("I am good");
        }, 2000);
        // observer.complete();
        // observer.next("This will not send");

    } catch (err) {
        observer.error(err);
    }

});

// Creation d'un observable apartir d'un evenement 
let observableEventMouse = fromEvent(document, "click"); // mousemove

// setTimeout(() => {
//     let subscription = observableEventMouse.subscribe((x: any) => {
//         addItem(x);
//     })
// }, 2000);
// ===========================================================================================

let observer = observable
    .subscribe(
        (x: any) => addItem(x),
        (error: any) => addItem(error),
        () => addItem("Completed")
    );

let observer2 = observable
    .subscribe(
        (x: any) => addItem(x),
        (error: any) => addItem(error),
        () => addItem("Completed")
    );

// arreter les deux observable
observer.add(observer2);

setInterval(() => {
    observer.unsubscribe();
}, 8000);


function addItem(val: any) {
    let node = document.createElement("li");
    let textNode = document.createTextNode(val);
    node.appendChild(textNode);
    document.getElementById("output").appendChild(node);
}

// Merge Operation ===========================================================================================
let observableOpMerge1 = Observable.create((observer: any) => {
    observer.next("2");
    observer.next("4");
    observer.next("6");
});
let observableOpMerge2 = Observable.create((observer: any) => {
    observer.next("1");
    observer.next("3");
    observer.next("5");
});

let merged = merge(observableOpMerge1, observableOpMerge2);
merged.subscribe((val: any) => addItem("val merge => " + val));
// ===========================================================================================

// map =======================================================================================
Observable.create((observer: any) => {
    observer.next("un");
    observer.next("deux");
    observer.next("troi");
})
    .pipe(
        filter((val: string) => val.length > 3),
        map((val: any) => val.toUpperCase())
    )
    .subscribe((x: any) => addItem(x));
// ===========================================================================================


// pluck cuillir ou detacher une partie ======================================================
const personsObserbale = from([
    { first: "Mario", last: "Luidgi", age: "37" },
    { first: "Nassim", last: "Rabouj", age: "23" },
    { first: "Zingo", last: "Ringp", age: "40" }
]);

const firstsObsevable = personsObserbale.pipe(pluck('first'));

const firstsObsevableObservable = firstsObsevable.subscribe((val: any) => addItem("pluck ==> " + val));

