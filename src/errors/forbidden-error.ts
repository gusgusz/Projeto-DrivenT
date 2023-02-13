import { ApplicationError } from "@/protocols";

export function forbidden(): ApplicationError {
  return {
    name: "forbidden",
    message: "No result for this search!",
  };
}
