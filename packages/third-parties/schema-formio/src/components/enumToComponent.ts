import {cleanObject} from "@tsed/core";
import {sentenceCase} from "change-case";
import {execMapper, registerFormioMapper} from "../registries/FormioMappersContainer";

export function enumToComponent(schema: any, options: any) {
  const component = execMapper("default", schema, options);
  const values = schema.enum.map((value: any) => {
    return {
      label: sentenceCase(value),
      value
    };
  });

  if (component.type === "select") {
    return cleanObject({
      ...component,
      data: {
        json: JSON.stringify(values)
      },
      dataSrc: "json",
      idPath: "value",
      valueProperty: "value",
      template: "<span>{{ item.label }}</span>"
    });
  }

  return cleanObject({
    ...component,
    values: schema["x-values"] || values.map((value: any) => ({...value, shortcut: ""}))
  });
}

registerFormioMapper("enum", enumToComponent);
