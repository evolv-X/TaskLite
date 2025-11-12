import { getRandomId } from "../utils/getrndid.js";
import { isValidTaskTitle, normalizeTitle } from "../utils/validation.js";

export type Task = {
    id: string;
    title: string;
    created: Date;
    description?: string | undefined;
    complete: boolean;
    deadline?: string;
};

// наименование функций / переменных camelCase
export function newTask(title: string, description?: string):Task {
    if (!isValidTaskTitle(title)) {
        throw new Error(`Incorrect title ${title} `);
    }
    return {
        id: getRandomId(),
        title: normalizeTitle(title),
        created: new Date(),
        description,
        complete: false,
        deadline: ""
    };
}
