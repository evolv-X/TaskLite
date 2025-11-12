import {type Task } from '../entitites/task.js'

export function taskSort(arr:Task[]):Task[] {
    arr.sort(function (a:Task, b:Task) {
  if (a.created.getTime() > b.created.getTime()) {
    return -1;
  }
  if (a.created.getTime() < b.created.getTime()) {
    return 1;
  }
  return 0;
  });
return arr;
}