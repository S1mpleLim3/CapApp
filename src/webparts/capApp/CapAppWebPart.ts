import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "CapAppWebPartStrings";
import CapApp from "./components/CapApp";
import { ICapAppProps } from "./components/ICapAppProps";
import { SPFI, spfi, SPFx } from "@pnp/sp";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

export interface ICapAppWebPartProps {
  description: string;
}

export default class CapAppWebPart extends BaseClientSideWebPart<ICapAppWebPartProps> {
  private sp: SPFI;
  public render(): void {
    const element: React.ReactElement<ICapAppProps> = React.createElement(
      CapApp,
      {
        context: this.context,
        sp: this.sp,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit().then(() => {
      this.sp = spfi().using(SPFx(this.context));
    });
  }
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
