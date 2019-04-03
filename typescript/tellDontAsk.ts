// Example for Tell, Don't Ask


// class Widget {
//     constructor(
//         readonly name: string,
//         readonly children: ReadonlyArray<Widget> = []
//     ) {}
// }


// class Display {
//     private constructor(readonly widgets: ReadonlyMap<string, Widget>) {}

//     static withWidgets(widgets: Array<Widget>): Display {
//         return new Display(
//             widgets.reduce(
//                 (widgetMap, w) => ({...widgetMap, [w.name]: w}), new Map()
//             )
//         );
//     }

//     addChildToWidget(child: Widget, name: string): Display {
//         if (!(name in this.widgets)) { return this }
//         return new Display({
//             ...this.widgets,
//             [name]: new Widget(name, [...this.widgets[name].children, child])
//         })
//     }
// }


// let display = Display.withWidgets([new Widget("foo"), new Widget("bar")]);
// display = display.addChildToWidget(new Widget("baz"), "bar")

// console.log(display);
// console.log(display.widgets["bar"]);


class Widget {
    constructor(
        readonly name: string,
        readonly children: ReadonlyArray<Widget> = []
    ) {}

    addChild(child: Widget): Widget {
        if (this.children.includes(child)) { return this };
        return new Widget(this.name, [...this.children, child]);
    }
}

class Display {
    private constructor(readonly widgets: ReadonlyMap<string, Widget>) {}

    static withWidgets(widgets: Array<Widget>) {
        return new Display(
            widgets.reduce(
                (widgetMap, w) => ({...widgetMap, [w.name]: w}), new Map()
            )
        );
    }

    addChildToWidget(child: Widget, name: string): Display {
        if (!(name in this.widgets)) { return this };
        return new Display(
            {...this.widgets, [name]: this.widgets[name].addChild(child)}
        )
    }
}


let display = Display.withWidgets([new Widget("foo"), new Widget("bar")]);
const bazWidget = new Widget("baz");
display = display.addChildToWidget(bazWidget, "bar");
display = display.addChildToWidget(bazWidget, "bar");

console.log(display);
console.log(display.widgets["bar"]);

