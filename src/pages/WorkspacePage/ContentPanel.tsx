import './ContentPanel.css';

const ContentPanel = () => {
  return (
    <div className="content-panel">
      <h1>Workspace</h1>
      <p>Welcome to the Tower Bot Workspace</p>
      <div className="card">
        <p>
          This is the file explorer workspace where you can manage your files.
        </p>
        <p>
          The left column shows a file explorer that can be resized by dragging.
        </p>
        <p>
          You can switch between the file explorer and chat by clicking the icons above.
        </p>
      </div>
    </div>
  );
};

export default ContentPanel; 