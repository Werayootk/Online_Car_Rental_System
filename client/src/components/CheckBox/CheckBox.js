import './CheckBox.scss';
import { Checkbox as AntDCheckbox } from 'antd';

function Checkbox(props) {
    return (
        <AntDCheckbox.Group {...props}>
            {props.children}
        </AntDCheckbox.Group>
    );
};

export default Checkbox;