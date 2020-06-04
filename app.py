from flask import Flask, request, render_template

app = Flask(__name__)


@app.route('/')
def welcome():
    bin_urls = [{"id": "1", "nomenclature": "ABHS1344", "lotno": "B-232",
                "qtyhold": "243", "serviceupto": "12/07/2020", "remark": "Need testing"}]
    return render_template('home.html', bin_urls=bin_urls)


if __name__ == "__main__":
    app.run()
