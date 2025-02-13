import React from 'react';
import PropTypes from 'prop-types';
import "./CustomerItem.css";

const CustomerItem = (props) => {

    const { name, onSelectCustomerCallback } = props;
    return (
        <div className='customer-item'>
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/026.png" className="customer-thumbnail" alt="customer"></img>
            <h3 className='customer-name'> {name} </h3>

            <button className="select-customer-button" onClick={() => { onSelectCustomerCallback(props) }}>Select customer</button>
        </div >
    )
};


CustomerItem.propTypes = {
    name: PropTypes.string.isRequired,
    onSelectCustomerCallback: PropTypes.func.isRequired
}

export default CustomerItem;