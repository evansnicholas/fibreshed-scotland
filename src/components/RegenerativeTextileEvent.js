import * as React from "react";
import { HTMLContent } from "./Content";
import { formatDate } from "../domain/EventUtils";

export default function RegenerativeTextileEvent({ data }) {
  const formattedStartDate = formatDate(data.start);
  const formattedEndDate = formatDate(data.end);
  return (
    <td>
      <div className="content">
        <h3 className="has-text-weight-bold mb-0">{data.summary}</h3>
        <p className="mb-0">
          {formattedStartDate} - {formattedEndDate}
        </p>
        {data.location ? <p className="mb-0">{data.location}</p> : null}
        <div>
          <HTMLContent content={data.description} />
        </div>
      </div>
    </td>
  );
}
