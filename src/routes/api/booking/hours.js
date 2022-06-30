import Book from "../models/Book";
import connect from "../db";

export async function get(event){
    try {
        await connect();
        const bookings = await Book.find({
            begHour: {
                $gte: new Date().getTime(),
            }
        }).select({
            begHour: 1,
            _id: 0
        });
        console.log(bookings);
        return {
            body: bookings,
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        };
    } catch (err) {
        console.log(err);
        return {
            body: err,
            status: 400,
        };
    }
}