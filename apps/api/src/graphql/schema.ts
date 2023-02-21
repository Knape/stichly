import "./types/User";
import "./types/Brand";
import { builder } from "./builder";

export const schema = builder.toSchema();
