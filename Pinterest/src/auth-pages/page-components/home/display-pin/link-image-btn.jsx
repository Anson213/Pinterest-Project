import PropTypes from 'prop-types';


const LinkBtn = ({link}) => {

  LinkBtn.propTypes = {
    link: PropTypes.string 
  }

    return (
   <a href={link} style="text-decoration: none;">
     <div style="padding: 20px; background-color: #e60023; color: white; text-align: center; border-radius: 5px;">
       Visit Website
     </div>
   </a>

    );
};

export default LinkBtn;