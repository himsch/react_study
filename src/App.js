import React, { Component } from "react";
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: "welcome",
      selectd_content_id: 2,
      subject: { title: "WEB", sub: "World Wide Web!" },
      welcome: { title: "Welcome", desc: "Hello, Reeact!!" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is for information" },
        { id: 2, title: "CSS", desc: "CSS is for design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" },
      ],
    };
  }

  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selectd_content_id) {
        return data;
        break;
      }
      i = i + 1;
    }
  }

  getContent() {
    var _title,
      _desc,
      _article = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === "read") {
      var _content = this.getReadContent();
      _article = (
        <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
      );
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContent
          onSubmit={(title, desc) => {
            this.max_content_id = this.max_content_id + 1;
            var contents = Array.from(this.state.contents);
            contents.push({
              id: this.max_content_id,
              title,
              desc,
            });
            this.setState({
              contents,
              mode: "read",
              selectd_content_id: this.max_content_id,
            });
          }}
        ></CreateContent>
      );
    } else if (this.state.mode === "update") {
      _content = this.getReadContent();
      _article = (
        <UpdateContent
          data={_content}
          onSubmit={(id, title, desc) => {
            var contents = Array.from(this.state.contents);
            var i = 0;
            while (i < contents.length) {
              if (contents[i].id === id) {
                contents[i] = { id, title, desc };
                break;
              }
              i = i + 1;
            }
            this.setState({ contents, mode: "read" });
          }}
        ></UpdateContent>
      );
    }
    return _article;
  }

  render() {
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={() => {
            this.setState({ mode: "welcome" });
          }}
        ></Subject>
        <TOC
          onChangPage={id => {
            this.setState({ mode: "read", selectd_content_id: Number(id) });
          }}
          data={this.state.contents}
        ></TOC>
        <Control
          onChangeMode={mode => {
            if (mode === "delete") {
              if (window.confirm("really?")) {
                var contents = Array.from(this.state.contents);
                var i = 0;
                while (i < this.state.contents.length) {
                  if (contents[i].id === this.state.selectd_content_id) {
                    contents.splice(i, 1);
                    break;
                  }
                  i = i + 1;
                }
                this.setState({
                  mode: "welcome",
                  contents,
                });
                alert("deleted");
              }
            } else {
              this.setState({ mode });
            }
          }}
        ></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
