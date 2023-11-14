
TableName = "tqf3"
Text = "code, thainame, engname, decription, credit, termyear_code"
Text2 = ""
# TableName = input("Enter Table name: ")
# Text = input("Enter col: ")
Arr = Text.split(", ")
print("//create ------------------------------------------")
print("router.post(\"/create\", async (req, res) =>{")
print("\ttry {")
print("\t\tconst { ", end ="")
i = 0
while i < len(Arr)-1:
  print(Text2+Arr[i]+", ", end ="")
  i += 1
print(Text2+Arr[i]+" } = req.body;")

print("\t\tconst new"+TableName+" = await pool.query(\"INSERT INTO "+TableName+" ( " + Text +" ) VALUES ( ", end ="")
i = 0
while i < len(Arr)-1:
  print("$"+ str(i+1) +", ", end ="")
  i += 1
print("$"+ str(i+1) +" ) RETURNING *\", ", end ="")
print("[ ", end ="")
i = 0
while i < len(Arr)-1:
  print(Text2+Arr[i]+", ", end ="")
  i += 1
print(Text2+Arr[i]+" ] );")
print("\t\tres.json(new"+TableName+".rows[0]);")
print("\t} catch (err) {")
print("\t\tconsole.error(err.message);")
print("\t\tres.status(500).send(\"Error: \"+err.message);")
print("\t}")
print("});\n")

print("//update ------------------------------------------")
print("router.put(\"/update/:id\", async (req, res) =>{")
print("\ttry {")
print("\t\tconst { id } = req.params;")
print("\t\tconst { ", end ="")
i = 0
while i < len(Arr)-1:
  print(Text2+Arr[i]+", ", end ="")
  i += 1
print(Text2+Arr[i]+" } = req.body;")
print("\t\tconst update"+TableName+" = await pool.query(\"UPDATE "+TableName+" SET ", end ="")
i = 0
while i < len(Arr)-1:
  print(Arr[i]+" = $"+ str(i+2) +", ", end ="")
  i += 1
print(Arr[i]+" = $"+ str(i+2) +" WHERE id = $1 \", ", end ="")
print("[ id, ", end ="")
i = 0
while i < len(Arr)-1:
  print(Text2+Arr[i]+", ", end ="")
  i += 1
print(Text2+Arr[i]+" ] );")
print("\t\tres.json(\""+TableName+" was updated!\"); ")
print("\t} catch (err) {")
print("\t\tconsole.error(err.message);")
print("\t\tres.status(500).send(\"Error: \"+err.message);")
print("\t}")
print("});")

print("\n//getbyid ------------------------------------------")
print("router.get(\"/get/:id\", async (req, res) =>{")
print("\ttry {")
print("\t\tconst { id } = req.params;")
print("\t\tconst get"+TableName+" = await pool.query(\"SELECT * FROM "+TableName+" WHERE id = $1\", [id] );")
print("\t\tif (get"+TableName+".rows.length === 0) {return res.status(404).json(\"Not Found!\");} ")
print("\t\tres.json(get"+TableName+".rows[0]);")
print("\t} catch (err) {")
print("\t\tconsole.error(err.message);")
print("\t\tres.status(500).send(\"Error: \"+err.message);")
print("\t}")
print("});")

print("\n//getall ------------------------------------------")
print("router.get(\"/get/:id\", async (req, res) =>{")
print("\ttry {")
print("\t\tconst { id } = req.params;")
print("\t\tconst get"+TableName+" = await pool.query(\"SELECT * FROM "+TableName+" \" );")
print("\t\tif (get"+TableName+".rows.length === 0) {return res.status(404).json(\"Not Found!\");} ")
print("\t\tres.json(get"+TableName+".rows);")
print("\t} catch (err) {")
print("\t\tconsole.error(err.message);")
print("\t\tres.status(500).send(\"Error: \"+err.message);")
print("\t}")
print("});")

print("\n//deletebyid ------------------------------------------")
print("router.delete(\"/delete/:id\", async (req, res) =>{")
print("\ttry {")
print("\t\tconst { id } = req.params;")
print("\t\tconst get"+TableName+" = await pool.query(\"SELECT * FROM "+TableName+" WHERE id = $1\", [id] );")
print("\t\tif (get"+TableName+".rows.length === 0) {return res.status(404).json(\"Not Found!\");} ")
print("\t\tconst delete"+TableName+" = await pool.query(\"DELETE FROM "+TableName+" WHERE id = $1\", [id] );")
print("\t\tres.json(\""+TableName+" was deleted!\"); ")
print("\t} catch (err) {")
print("\t\tconsole.error(err.message);")
print("\t\tres.status(500).send(\"Error: \"+err.message);")
print("\t}")
print("});")

