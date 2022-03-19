const formatDatetime = (val) => {
    const dateConvert = val.toISOString().split('T')[0];
    return dateConvert;
}

export default formatDatetime;