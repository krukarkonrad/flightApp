export const API_BASE_URL = 'http://localhost:8080/api';

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 40;

export const GENDERS =[
    {
        value:'GENDER_MALE',
        label:'Male'
    },{
        value:'GENDER_FEMALE',
        label:'Famale'
    },{
        value:'GENDER_PNG',
        label:'Prefer not to give'
    }
]

export const TOURSIT_COLUMNS = [
    {title: 'Name', dataIndex: 'name', key: 'name', align: 'center'},
    {title: 'Surname', dataIndex: 'surname', key: 'surname', align: 'center'},
    {title: 'Country', dataIndex: 'country', key: 'country', align: 'center'},
    {title: 'Birth Date', dataIndex: 'birthDate', key: 'birthDate', align: 'center'},
    {title: 'Notes', dataIndex: 'notes', key: 'notes', align: 'center'}
]

export const FLIGHT_COLUMNS = [
    {title: 'fligthStart', dataIndex: 'fligthStart', key: 'fligthStart', align: 'center'},
    {title: 'fligthEnd', dataIndex: 'fligthEnd', key: 'fligthEnd', align: 'center'},
    {title: 'seats', dataIndex: 'seats', key: 'seats', align: 'center'},
    {title: 'takenSeatss', dataIndex: 'takenSeatss', key: 'takenSeatss', align: 'center'},
    {title: 'ticketPrice', dataIndex: 'ticketPrice', key: 'ticketPrice', align: 'center'}
]