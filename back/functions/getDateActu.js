const getDateActu = () => {
    let dateActuelle = new Date();

    let options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Europe/Paris',
    };

    let dateFormatee = new Intl.DateTimeFormat('fr-FR', options).format(dateActuelle);

    return dateFormatee.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/, '$3-$2-$1 $4:$5:$6');
}

module.exports = { getDateActu }