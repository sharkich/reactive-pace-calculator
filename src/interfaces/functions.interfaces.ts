import {TypeGetter} from 'typesafe-actions';

export type FunctionVoid = () => void;

export type FunctionActionEmpty = (() => { type: string }) & TypeGetter<string>;
