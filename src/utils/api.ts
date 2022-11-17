import axios from "axios"

export async function getProjects() {
    const response = await axios.get("http://localhost:3000/projects");
    if (!response) {
        throw { message: "Failed to fetch projects", status: 500 }
    }
    return response
}
export async function getTasks() {
    const response = await axios.get("http://localhost:3000/tasks");
    if (!response) {
        throw { message: "Failed to fetch tasks", status: 500 }
    }
    return response
}
export async function getTimes() {
    const response = await axios.get("http://localhost:3000/timelogs");
    if (!response) {
        throw { message: "Failed to fetch the timelogs", status: 500 }
    }
    return response
}

export async function getTimesForDate(date: string) {
    const response = await axios.get(`http://localhost:3000/timelogs?startDate=${date}`)
    if (!response) {
        throw { message: "Failed to fetch the timelog", status: 500 }
    }
    return response
}

export async function getInvoices() {
    const response = await axios.get(`http://localhost:3000/invoices`);
    if (!response) {
        throw { message: "Failed to fetch invoices"}
    }
    return response
}