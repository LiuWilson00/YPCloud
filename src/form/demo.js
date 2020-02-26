const json = {
    name: "My Form",
    depiction: "This is Wilson Form",
    header: {
        color: "blue-grey lighten-5"
    },
    data: [
        {
            type: "text-field",
            name: "name",
            defaultValue: "plz input you name"
        },
        {
            type: "tv",
            name: "TreeView",
            depiction: "sex",
            data: [
                {
                    id: 1,
                    name: "Man"
                },
                {
                    id: 2,
                    name: "Womon"
                }
            ]
        },
        {
            type: "text-field",
            name: "Hello",
            defaultValue: "Hello World"
        },
        {
            type: "ta",
            name: "tatest",
            defaultValue: "Hello World"
        },
        {
            type: "slider",
            varName: "sliderVar",
            name: "slider test",
            defaultValue: "15",
            thumbLabel: true
        },
        {
            type: "checkBox",
            name: "sex",
            depiction: "sex",
            data: [
                {
                    id: 1,
                    name: "Man",
                    value: "M"
                },
                {
                    id: 2,
                    name: "Womon",
                    value: "W"
                }
            ]
        },
        {
            type: "date",
            varName: "Date",
            label: "plz input your date",
            name: "Date Time",
            col: 6,
            thumbLabel: true
        },
        {
            type: "time",
            varName: "time",
            label: "plz input your time",
            name: "Time",
            col: 6,
            thumbLabel: true
        },
        // {
        //     type: "text-field",
        //     name: "msg",
        //     defaultValue: "Hello plz input msg",
        //     col:6
        // },
        // {
        //     type: "text-field",
        //     name: "msg2",
        //     defaultValue: "Hello plz input msg2",
        //     col:6
        // }

    ],
    setting: {
        style: "dark",
        maxWidth: 1024
    }
}
export default json
