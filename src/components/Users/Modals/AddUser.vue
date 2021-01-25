class User
{
	public string Name { get; set;}
	public int Age { get; set;}
	public List<string> Languages { get; set;}
	public User()
	{
		Languages = new List<string>();
	}
}


List<User> users = new List<User>
{
	new User { Name="Tom", Age=23, Languages = new List<string> { "English"}}
};

var selectedUsers = from user in users
			where user.Age > 25
			select user;
	foreach ( User user in selectedUsers)
		Console.WriteLinw($"{user.Name} - {user.Age}");
		
 var selectedUsers = from user in users
					 from lang in user.Languages
					 where user.Age < 28
					 where lang == "english"
					 select user;
					 
var selectedUsers = user.SelectMany(u => u.Languages,
									(u, 1) => new { User = u, lang = 1 })
									.Where(u => u.Lang == "english" && u.User.Age < 28)
									.Select(u => u.User);
									
class User
{
	public string Name { get; set;}
	public int Age { get; set;}
}

List<User> users = new List<User>();
users.Add(new User { Name = ""})

string sentence = "the quick brown fox jumps over the lazy dog";

string [] words = sentence.Split(' ');

var query = from word in words
			qroup word.ToUpper() by word.Length into gr
			orderby gr.Key
			select new { length = gr.Key, words = g }).
			OrderBy(o => o.length);
		
		foreach (var obj in query)
		{
			Console.WriteLine($"Words of length {0}:", obj.Length);
			foreach (string word in obj.Words)
			  Console.WriteLine(word);
		}
		
		
		
		
		
		
		
		
		
		
		
class LINQQueryExpressions
{
	static void Mani()
	{
		int[] scores = new int[] { 97, 92, 81, 60 };
		
		IEnumerable<int> scoreQuery = 
						 from score in scores
						 where score > 80
						 select score;
						 
				foreach (int in in scoreQuery)
				{
					Console.Write(i + " ");
				}
	}
}
// Output : 97 92 81

--------------------------------------
 public class IntroLINQ
 {
	static void Main()
	{
		int[] numbers = new int[7] { 0, 1, 2, 3, 4, 5, 6 };
		
		var numQuery = 
				from num in numbers
				where (num % 2) == 0
				select num;
				
		foreach (int num in numQuery)
		{
			Console.Write("{0,1}", num);
		}
	}
 }
 
 public clas App
 {
	public static void Main()
	{
		TestStreamReaderEnumerable();
		Console.WriteLine("---");
		TestReadingFile();
	}
	
	public static void TestStreamReaderEnumerable()
	{
		long memoryBefore = GC.GetTotalMemory(true);
		IEnumerable<String> stringFound;
		
		try {
			stringFound = 
					from line in new StreamReaderEnumerable(@"c:\temp\tempFile.txt")
					where line.Contains("string to search for")
					select line;
				Console.WriteLine("Found: " + stringsFound.Count());
		}
		catch (FileNotFoundException) {
			Console.WriteLine(@"This example requires a file named C:\temp\tempFile.txt.");
         return;
		}
		long memoryAfter = GC.GetTotalMemory(false);
		Console.WriteLine("Memory Used With Iterator = \t"
            + string.Format(((memoryAfter - memoryBefore) / 1000).ToString(), "n") + "kb");
    }
	public static void TestReadingFile()
	{
		long memoryBefore = GC.GetTotalMemory(true);
		StreamReader sr;
		try {
		sr = file.OpentText("C:\temp\tempFile.txt.");
		}
		catch (FileNotFoundException) {
			Console.WriteLine(@"This example requires a file named C:\temp\tempFile.txt.");
			return;
		}
		
		//Add the file contents to a generic list of string.
		List<string> fileCOntents = new List<string>();
		while (!sr.EndOfStream) {
			fileContents.Add(sr.ReadLine());
		}
		//Проверить строку 
		var stringsFound = 
			from line in fileContents
			where line.Contains("string to search for")
			select line;
		sr.Close();
		Console.WriteLine("Found: " + stringsFound.Count());
		
		//Проверьте память после того, как итератор не используется, и выведите его на консоль
		long memoryAfter = GC.GetTotalMemory(false);
		Console.WriteLine("Memory Used Without Ierator = \t" +
			string.Format(((memoryAfter - memoryBefore) / 1000).ToString(), "n") + "kb");
	}
 }
Northwnd db = new Northwnd(@"C:\northwnd.mdf");

//Query for customers in London.

IQueryable<Customer> custQuery = from cust in db.Customers
								 where cust.City == "London"
								 select cust;
								 
								 
---------
List<int> numQuery2 = (from num in numbers
						where (num % 2) == 0
						select num).ToList();

---------------------------
void Button_Click(object sender, EventArgs e)
{
	string[] array =
	{
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
	};
	var list2 = new List<string>
	{
		'a',
		'b',
		'c',
		'd',
		'e',
		'f'
	};
	list.Union(list2);
	label1.Text = string.Join(Environment.NewLine.list);
	-----------------------------------------------
	//var newlist = new List<string>();
	//foreach (string line in list)
	// if (line.Contains("e"))
	// newlist.Add(line);
	ТЕПЕРЬ МОЖНО УПРОСТИТЬ И БУДЕТ ТОЖЕ САМОЕ 
	
	var newlist = list.Where(x => x.Contains(e));
	ВОТ...
	------------------------------------------------
	var newlist = list.GroupBy(g => g).Where(g => g.Count() > 1).Select(g = g.Key);
	
	-------------------------------------------------
	Parallel.For(0, 3, x =>
	{
		MessageBox.Show(list[x]);
	}
	-------------------------------------------------
	var list = new List<string>
	{
	 @"C:\Users\Admin\Desktop\1.txt",
	 @"C:\Users\Admin\Desktop\2.txt",
	 @"C:\Users\Admin\Desktop\3.txt",
	}
	
	
	list.AsParallel().ForAll(x =>
	{
	});
	
	Parallel.For(0,3, x =>
	{
		MessageBox.Show(list[x]);
	});
	//Все индентично
	
	Enumereable.Range(0,3).AsParallel().ForAll(x =>
	{
		File.Delete(list[x]); 
	});
	
	Parallel.ForEach(list, x =>
	{
		File.Delete(x);
	});
	//Также идентично
	
	-------------------------------------------------
	var list = new List<string>
	{
		"vk.com",
		"fb.com",
		"twitter.com",
		"instagram.com"
	};
	
	label1.Text = new Ping().Send(list[0]).RoundtripTime.ToString();
	
	 //var newlist = list.Where(x => new Ping().Send(x).RoundtripTime < 50);
	 //var newlist = list.Select(x => $"{x} {new Ping().Send(x).RoundtripTime}");
	 
	 label1.Text = list.Where(x => new Ping().Send(x).RoundtripTime < 30).ToString();
	 label1.Text = string.Join(Environment.NewLine, newList);
	
	//list.AsParallel().ForAll(x => File.Delete(x));
	//Enumerable.Range(0, 3).AsParallel().ForAll(x => File.Delete(list[x]));
	//Parallel.ForEach(list, x => File.Delete(x));
	//Parallel.For(0,3, x => MessageBox.Show(list[x]));
	
	-------------------------------------------------
	var newlist = array.Reverse();
	label1.Text = string.Join(Environment.NewLine. newlist);
}
































