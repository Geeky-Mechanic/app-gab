import Book from '../models/Book';
import connect from "../db";

export async function post({request}){
    const req = await request.json();
    const name = req.name;
    const lastName = req.lName;
    const email = req.email;
    const phoneNumber = req.phone;
    const begDate = req.date;
    const begH = new Date(begDate);
    const  endHour = new Date(begDate).setHours(begH.getHours() + 2);
    if(!(await between(begDate)) && !tooEarly(begDate) && !tooLate(begDate)){
        try{
            await connect();
            const newBooking = new Book({
                name,
                lastName,
                email,
                phoneNumber,
                begHour: begH.getTime(),
                endHour,
                completed: false,
                confirmed: false,
            });
            const savedBooking = await newBooking.save();

            return {
                body: savedBooking,
                status: 200,
            }
        } catch(err){
            return {
                body: err,
                status: 500,
            }
        }
    } else {
        return {
            status: 403,
        }
    }
}

/* --->  validate post query  <--- */

async function between(newBook) {
    const bookingDate = new Date(newBook).getTime();
    const data = await Book.find();
    return data.some(obj => {
        const begDate = new Date(obj.begHour).getTime();
        const endDate = new Date(obj.endHour).getTime();
        return bookingDate > begDate && bookingDate < endDate;
    });
};

function tooEarly(newBook) {
    const bookingDate = new Date(newBook);
    return bookingDate.getUTCHours() < 12;
};

function tooLate(newBook) {
    const bookingDate = new Date(newBook);

    return bookingDate.getUTCHours() > 19;
};