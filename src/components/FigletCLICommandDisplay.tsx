import type React from "react";
import { Copy as CopyIcon } from "react-feather";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";

export type FigletCLIDisplayProps = {
  cliName: string;
  text?: string;
};

export const FigletCLIDisplay: React.FC<FigletCLIDisplayProps> = ({
  cliName,
  text,
}) => {
  const commandString = `figlet -f ${cliName} ${text ? `'${text}'` : "'<text>'"}`;
  const { copyToClipboard, message, hasMessage } = useCopyToClipboard();

  return (
    <div className="figlet-cli-wrapper">
      <span role="img" aria-label="computer">
        💻
      </span>{" "}
      <code title="Use this name with the figlet CLI">
        {hasMessage ? message : commandString}
      </code>
      <button
        type="button"
        className="reset"
        onClick={() => copyToClipboard(commandString)}
      >
        <CopyIcon />
      </button>
    </div>
  );
};
