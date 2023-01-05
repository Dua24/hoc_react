import React from 'react';
class MyComponent extends React.Component {

    state = {
        name: "Duy nguyen",
        age: 20,
        address: "Ca mau"
    }

    handleOnChange(e) {
        this.setState({
            name: e.target.value,
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        console.log(this.state)
    }

    render() {
        return (
            <div>
                My name is {this.state.name} and i'm {this.state.age}
                <form onSubmit={(e) => { this.handleSubmit(e) }}>
                    <input type="text"
                        onChange={(e) => { this.handleOnChange(e) }}
                    />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default MyComponent;
