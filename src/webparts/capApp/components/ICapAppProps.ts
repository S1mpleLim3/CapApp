import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFI } from "@pnp/sp";

export interface ICapAppProps {
  context: WebPartContext;
  sp: SPFI;
}
