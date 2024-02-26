import * as React from "react";
import { DateTime } from "luxon";
import { HTMLContent } from "./Content";

function formatDateTime(dateTime) {
    return DateTime.fromISO(dateTime).toLocaleString(DateTime.DATETIME_FULL);
}

export default function RegenerativeTextileEvent({ data }) {
  return (
    <div className="card mb-2">
      <div class="card-content">
        <div class="content">
          <h2 className="has-text-weight-bold mb-0">{data.summary}</h2>
          <p>{formatDateTime(data.start.dateTime)}</p>
          <p>
            <HTMLContent content={data.description} />
          </p>
        </div>
      </div>
    </div>
  );
}