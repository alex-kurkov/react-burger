import React from "react";
import PropTypes from 'prop-types';
import styles from './navigation-link.module.css';

export const NavigationLink = (
  props: { 
    active: boolean;
    text: String; 
    onClick: React.MouseEventHandler | undefined; 
    icon: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; 
  }) => {
    return (
      <a onClick={props.onClick} href="/" className={`${styles.link} ${!props.active && styles.inactive} text text_type_main-default pt-2 pb-2`}>
        {props.icon}
        <span className={`${styles.text} ml-1`}>{props.text}</span>
      </a>
    )
}

NavigationLink.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.element.isRequired,
  active: PropTypes.bool.isRequired,
}

