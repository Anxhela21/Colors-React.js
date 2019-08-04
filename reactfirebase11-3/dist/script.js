
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDxV3HeSTreOjZRUIimPkztgt9r4Vny3UU",
  authDomain: "colorswitcherapp-e0cd2.firebaseapp.com",
  databaseURL: "https://colorswitcherapp-e0cd2.firebaseio.com",
  projectId: "colorswitcherapp-e0cd2",
  storageBucket: "colorswitcherapp-e0cd2.appspot.com",
  messagingSenderId: "312555257463" };

firebase.initializeApp(config);

const { Component } = React;
const colorArray = ["white", "gray", "lightblue", "lightgreen"];

class ColorSwitcherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: this.props.colorsArray };

  }
  componentDidMount() {
    // items in .ref() represent the table in the colorswitcherapp realtime database
    // itemsRef is grabbing the table and all of it's objets/items
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push(items[item].color);
      }
      console.log('this is newState: ', newState);
      this.setState({
        colors: newState });

    });
  }

  handleSubmit(val) {
    event.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      color: val };

    itemsRef.push(item);

    // this.setState(prevState => ({
    //   colors: [...prevState.colors, val ]
    // }))
  }

  render() {
    return (
      React.createElement("section", null,
      React.createElement("h1", null, "Color Scheme Switcher"),
      React.createElement("p", null, "Try clicking on one of the colors above to change the colors on this page!"),



      React.createElement(Form, { onSubmit: val => {this.handleSubmit(val);}, placeholder: 'type a color' }),
      React.createElement(ColorList, { colors: this.state.colors })));


  }}


class ColorList extends React.Component {

  render() {
    console.log('this is colors array from ColorList: ', this.props.colors);
    let lis = this.props.colors.map((d, i) => React.createElement(ColorListItem, { shade: d }));
    return React.createElement("ul", { id: "switcher" }, lis);
  }}


class ColorListItem extends Component {

  changeBackgroundColor() {
    let color = this.refs.li.style.backgroundColor;
    let body = document.getElementsByTagName('body')[0];
    body.style.backgroundColor = color;
  }

  render() {
    return React.createElement("li", {
      ref: "li",
      style: { backgroundColor: this.props.shade },
      className: this.props.shade,
      onClick: () => this.changeBackgroundColor() });

  }}


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '' };

  }

  handleChange() {
    //console.log(event.target.value)
    this.setState(prevState => ({
      value: event.target.value }));

  }

  handleSubmit() {
    this.props.onSubmit(this.state.value);
    this.setState(prevState => ({
      value: '' }));

  }

  render() {
    return (
      React.createElement("div", null,
      React.createElement("form", { onSubmit: () => this.handleSubmit() },
      React.createElement("input", { placeholder: this.props.placeholder, onChange: () => this.handleChange(), value: this.state.value }),
      React.createElement("button", null, "Add A Color"))));



  }}


ReactDOM.render(
React.createElement(ColorSwitcherApp, { colorsArray: colorArray }),
document.getElementById("root"));