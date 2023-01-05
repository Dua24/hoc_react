import React from 'react';
class MyComponent extends React.Component {

    state = {
        name: "Duy nguyen",
        age: 20,
        address: "Ca mau"
    }

    render() {
        return (
            <div>
                My name is {this.state.name} and i'm from {this.state.address}
            </div>
        );
    }
}

export default MyComponent;
