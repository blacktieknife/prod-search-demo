import { h, Component } from "preact";
import "./style.scss";
import matchSorter from "match-sorter";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue:'',
      products:props.products,
    }
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.filterProps = this.filterProps.bind(this);
  }
  render(props) {
    return (
      <div>
        <h2>Products</h2>
        <label for="prod_search_input"><small>search </small></label>
        <input type="search" id="prod_search_input" value={this.state.searchValue} onInput={this.handleSearchInput}/>
        <div id="prod_container" style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;">
        {this.filterProps().map((product)=>{
              return (
                <div 
                id="prod_card"
                key={product.itemid}
                style="display:flex;flex-direction:column;align-items:center;width:325px;margin:15px;" 
               >
                  <p><b>{product.style}</b></p>
                  <i>{product.item_pattern} <br />
                   {product.color} - {product.item_fabric} <br />
                   <div>{product.item_description}</div>
                   </i>
                  <div dangerouslySetInnerHTML={{__html: product.catalogdescription}}>
                  </div>
                </div>
              
              )
          })}
        </div>
      </div>
    );
  }
  filterProps() {
    const filteredArray = matchSorter(
        this.state.products, 
        this.state.searchValue, 
        {
          keys:[
            'catalogdescription',
            'item_pattern',
            'style',
            'color',
            'item_description',
            'item_brand',
            'item_fabric',
            'item_keyword',
            'item_fit',
            'item_fit_other',
            'styleinfo',
          ]
        }
      )
      return filteredArray;
  }
  handleSearchInput(e) {
    this.setState({searchValue:e.target.value});
  }
}

