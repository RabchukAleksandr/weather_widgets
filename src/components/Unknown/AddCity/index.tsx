import React, {useState} from 'react';
import {Box, Typography} from "@mui/material";
import Dialog from "../Dialog";
import {ReactComponent as Add} from "./../../../assets/icons/add.svg";
import styles from './styles.module.css'

type AddCityProps = {}

const AddCity: React.FC<AddCityProps> = () => {
    const [toggle, setToggle] = useState<boolean>(false)

    const onDialogToggle = () => {
        setToggle(!toggle)
    }

    return (
        <>
            <Dialog open={toggle} onClose={onDialogToggle}/>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} border={'black solid 2px'}
                 borderRadius={2} flexDirection={'column'} p={2} width={1}>
                <Typography variant={'h4'}>Add city</Typography>
                <Box className={styles.icon} mt={2} onClick={onDialogToggle}><Add/></Box>
            </Box>
        </>
    );
};

export default AddCity;